import tkinter as tk
from tkinter import messagebox
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT  # Para centralização
import re

def process_text():
    input_text = text_area.get("1.0", tk.END).strip()
    form_data = parse_form_data(input_text)
    
    if form_data:
        save_to_word(form_data)
        messagebox.showinfo("Sucesso", "Dados exportados para Word com sucesso!")
    else:
        messagebox.showerror("Erro", "Não foi possível processar os dados.")

def parse_form_data(data):
    entries = re.findall(r'(\w+)\s*\n\s*([^\n]+)', data)
    return {key: value for key, value in entries}

def format_key(key):
    question_mapping = {
        'razao_social': 'Razão Social da Empresa:',
        'cnpj': 'Número de Identificação Fiscal (CNPJ):',
        'nome_fantasia': 'Nome Fantasia:',
        'data_abertura': 'Data de Constituição/Abertura da Empresa:',
        'atividade_principal': 'Atividade Principal da Empresa:',
        'endereco': 'Endereço Completo:',
        'cep': 'CEP:',
        'cidade': 'Cidade:',
        'estado': 'Estado:',
        'site': 'Site da Empresa:',
        'arranjo': 'O Cliente é membro de um ou mais Arranjo(s) Societário(s)?',
        'compliance': 'A empresa possui departamento de Compliance? Se sim, informar nome do(a) Compliance Officer e e-mail:',
        'compliance_officer': 'Nome do(a) Compliance Officer e e-mail:',
        'codigo_conduta': 'A empresa possui Código de Conduta/Ética?',
        'pldft': 'A Empresa possui políticas e procedimentos de prevenção a fraudes?',
        'organograma': 'Existem outras empresas que constam no organograma da organização?',
        'detalhes_organograma': 'Por favor, descreva os detalhes do organograma:',
        'autuacao': 'A empresa ou qualquer outra pertencente ao mesmo grupo econômico já foi autuada?',
        'outra_sociedade': 'Os sócios fazem parte de outras sociedades/empresas?',
        'processos': 'A empresa ou seus sócios já foram objeto de processos administrativos ou criminais?',
        'pep': 'A empresa ou seus sócios são considerados PEP (Pessoas Expostas Politicamente)?',
        'citado_midia': 'A empresa e/ou seus sócios, é (são) citada(os) em mídia por suspeitas de atividades criminais?',
        'percentual_dinheiro': 'Qual o percentual que representa dinheiro em espécie?',
        'gestao_empresa': 'Por quem é feita a gestão da empresa?',
        'atividades_empresa': 'Qual(is) a(s) atividade(s) da empresa?',
        'origem_recursos': 'Se a empresa foi constituída há menos de 2 anos, informar a origem dos recursos:',
        'fluxo_dinheiro': 'Qual o fluxo do dinheiro? Como vai operar cash-in e cash-out?',
        'volume_operacao': 'Qual o volume esperado da operação?',
        'maturidade_tecnologica': 'Qual a maturidade tecnológica da empresa? (Iniciante, intermediário ou avançado)',
        'uso_3xpay': 'Por que contratou ou pretende contratar o 3X Pay e como vai utilizar nossas soluções?',
        'nome_representante': 'Nome do Representante Legal do Contrato:',
        'cargo_representante': 'Cargo:',
        'telefone_representante': 'Telefone:',
        'email_representante': 'E-mail:',
        'cpf_representante': 'CPF:',
        'rg_representante': 'RG:',
        'servicos': 'Objeto da Parceria: Quais serviços do 3X Pay serão utilizados? (Transações via Pix, Transações Cartão de Crédito, APIs, Emissão de Boletos)'
    }

    # Adicionando mapeamento para múltiplos sócios
    for i in range(2, 6):
        question_mapping[f'nome_socio{i}'] = f'Nome Completo dos Sócios/Diretores/Administradores/Representantes Legais {i}:'
        question_mapping[f'cpf_socio{i}'] = f'CPF/CNPJ {i}:'
        question_mapping[f'data_nascimento{i}'] = f'Data de Nascimento {i}:'
        question_mapping[f'percentual_societario{i}'] = f'Percentual Societário {i}:'
        question_mapping[f'us_person{i}'] = f'É US Person {i}?'

    return question_mapping.get(key, key.replace('_', ' ').title())

def format_value(value, key):
    if value.lower() == "sim":
        return "Sim"
    elif value.lower() == "não":
        return "Não"
    return value

def save_to_word(data):
    document = Document()
    
    # Título
    title = document.add_heading('Relatório de Dados do Formulário', level=1)
    title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER  # Centralizar o título
    run = title.runs[0]
    run.font.size = Pt(14)  # Aumentar o tamanho da fonte
    run.font.name = 'Arial Narrow'  # Definir a fonte como Arial Narrow

    document.add_paragraph()  # Espaçamento

    nome_arquivo = f"Relatório {data.get('nome_socio1', 'Relatório')}.docx"

    for key, value in data.items():
        formatted_key = format_key(key)
        formatted_value = format_value(value, key)

        # Adicionar pergunta em negrito
        paragraph = document.add_paragraph()
        run = paragraph.add_run(f"{formatted_key}")
        run.bold = True
        run.font.name = 'Arial Narrow'  # Definir a fonte como Arial Narrow
        
        # Adicionar a resposta em um novo parágrafo
        response_paragraph = document.add_paragraph(formatted_value)
        response_paragraph.style.font.name = 'Arial Narrow'  # Definir a fonte como Arial Narrow

    document.save(nome_arquivo)

# Configuração da interface gráfica
root = tk.Tk()
root.title("Formulário para Word")

text_area = tk.Text(root, height=20, width=50)
text_area.pack(pady=20)

process_button = tk.Button(root, text="Exportar para Word", command=process_text)
process_button.pack(pady=10)

# Executar a aplicação
root.mainloop()