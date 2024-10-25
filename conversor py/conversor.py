import tkinter as tk
from tkinter import messagebox
from docx import Document
import re

def process_text():
    # Obter texto do campo de entrada
    input_text = text_area.get("1.0", tk.END).strip()
    
    # Processar o texto e formatar
    form_data = parse_form_data(input_text)
    
    if form_data:
        save_to_word(form_data)
        messagebox.showinfo("Sucesso", "Dados exportados para Word com sucesso!")
    else:
        messagebox.showerror("Erro", "Não foi possível processar os dados.")

def parse_form_data(data):
    # Usar regex para extrair os dados
    entries = re.findall(r'(\w+)\s*\n\s*([^\n]+)', data)
    return {key: value for key, value in entries}

def format_key(key):
    # Substituir underlines por espaços e capitalizar a primeira letra de cada palavra
    formatted_key = key.replace('_', ' ').title()
    return formatted_key

def format_value(value):
    # Capitalizar a primeira letra de cada palavra no valor
    return ' '.join(word.capitalize() for word in value.split())

def save_to_word(data):
    document = Document()
    
    # Adicionar título do documento
    document.add_heading('Relatório de Dados do Formulário', level=1)
    document.add_paragraph()  # Adiciona um parágrafo vazio para espaçamento

    # Gerar o nome do arquivo com base no nome do sócio
    if 'nome_socio1' in data:
        nome_socio = data['nome_socio1']
        nome_arquivo = f"Relatório {nome_socio}.docx"
    else:
        nome_arquivo = "Relatório.docx"

    for key, value in data.items():
        # Formatar chave e valor
        formatted_key = format_key(key)
        
        # Ajustar o campo pldft
        if key == 'pldft':
            formatted_value = "Sim" if value.lower() == "sim" else "Não"
        else:
            formatted_value = format_value(value)
        
        # Adicionar parágrafo com título em negrito
        paragraph = document.add_paragraph()
        paragraph.add_run(f"{formatted_key}: ").bold = True  # Título em negrito
        paragraph.add_run(formatted_value)  # Valor normal

        # Adicionar espaçamento entre parágrafos
        document.add_paragraph()  # Adiciona um parágrafo vazio para espaçamento

    # Salvar o documento com o nome gerado
    document.save(nome_arquivo)

# Configuração da interface gráfica
root = tk.Tk()
root.title("Formulário para Word")

# Campo de texto para entrada
text_area = tk.Text(root, height=20, width=50)
text_area.pack(pady=20)

# Botão para processar texto
process_button = tk.Button(root, text="Exportar para Word", command=process_text)
process_button.pack(pady=10)

# Executar a aplicação
root.mainloop()