import zipfile
import xml.etree.ElementTree as ET
import os

def docx_to_markdown(docx_path):
    if not os.path.exists(docx_path):
        return f"Error: File {docx_path} not found."
        
    try:
        with zipfile.ZipFile(docx_path) as z:
            # Check document.xml
            if 'word/document.xml' not in z.namelist():
                return "Error: Invalid docx format (word/document.xml not found)."
                
            xml_content = z.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # OpenXML namespaces
            namespaces = {
                'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
            }
            
            paragraphs = []
            # Iterate through child elements of the body
            body = root.find('w:body', namespaces)
            if body is None:
                return "Error: Could not find document body."
                
            for child in body:
                tag = child.tag.split('}')[-1]
                
                # Paragraph
                if tag == 'p':
                    # Extract text from runs
                    runs_text = []
                    for r in child.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                        if r.text:
                            runs_text.append(r.text)
                    
                    p_text = ''.join(runs_text).strip()
                    
                    # Try to detect if it's a heading based on style properties
                    pPr = child.find('w:pPr', namespaces)
                    is_heading = False
                    heading_level = 0
                    
                    if pPr is not None:
                        pStyle = pPr.find('w:pStyle', namespaces)
                        if pStyle is not None:
                            style_val = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                            if style_val and style_val.startswith('Titre'):
                                is_heading = True
                                try:
                                    heading_level = int(style_val.replace('Titre', ''))
                                except ValueError:
                                    heading_level = 1
                            elif style_val and style_val.startswith('Heading'):
                                is_heading = True
                                try:
                                    heading_level = int(style_val.replace('Heading', ''))
                                except ValueError:
                                    heading_level = 1
                                    
                    if is_heading and p_text:
                        paragraphs.append('\n' + '#' * heading_level + ' ' + p_text + '\n')
                    elif p_text:
                        paragraphs.append(p_text)
                    else:
                        paragraphs.append('') # empty paragraph
                        
                # Table
                elif tag == 'tbl':
                    paragraphs.append('\n[Tableau détecté dans le document]\n')
                    for row in child.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr'):
                        row_cells = []
                        for cell in row.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc'):
                            cell_text = ''.join(t.text for t in cell.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text).strip()
                            row_cells.append(cell_text)
                        paragraphs.append(' | '.join(row_cells))
                    paragraphs.append('\n')
            
            return '\n'.join(paragraphs)
            
    except Exception as e:
        return f"Error extracting docx: {str(e)}"

if __name__ == '__main__':
    docx_file = 'prd.docx'
    output_file = 'prd.md'
    print(f"Extracting {docx_file} to {output_file}...")
    content = docx_to_markdown(docx_file)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done! Check prd.md.")
