from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Carrega as variáveis de ambiente
load_dotenv()

# Configura a API do Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_lesson_plan", methods=["POST"])
def generate_lesson_plan():
    data = request.json

    # Exemplo simples de chamada à IA
    prompt = f"""
    Crie um plano de aula com:
    Título: {data['lessonTitle']}
    Descrição: {data['lessonDescription']}
    Objetivos: {data['learningObjectives']}
    Disciplina: {data['subject']}
    Nível: {data['gradeLevel']}
    Duração: {data['duration']} minutos
    Recursos: {data['resources']}
    """

    try:
        # Configuração do modelo Gemini
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Chamada ao Gemini
        response = model.generate_content(prompt)
        
        plan = response.text
        return jsonify({"lesson_plan": plan})
    
    except Exception as e:
        return jsonify({"error": f"Erro ao gerar plano de aula: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
