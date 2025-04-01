import pdfplumber
import os
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
from flask import Flask,jsonify,request
from flask_cors import CORS

app=Flask(__name__)

CORS(
    app,
    origins="*",
    methods=["POST", "GET", "OPTIONS"],  # Explicitly allow OPTIONS
    allow_headers=["Content-Type"],  # Allow Content-Type header
)

@app.route("/v1/getInvoiceData",methods=["GET","POST"])
def getInvoiceData():
    if request.method == "OPTIONS":
        # Handle preflight request
        response = jsonify({"message": "Preflight request handled"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response
    if request.method=="GET":
        load_dotenv()
        openaiapi= os.getenv("OPENAI_API_KEY")

        with pdfplumber.open("Comcast Bill.pdf") as pdf:
            text=""
            for page in pdf.pages:

                text+= page.extract_text()
            print(text)
            llm = ChatOpenAI(model_name="gpt-4")

            prompt_template = PromptTemplate(
            input_variables=["text", "query"],
            template="""
            Given the text from an invoice:
            {text}

            Answer the following query:
            {query}
            """
                )
            query = "What is the invoice date,invoice number, total amount due,due_date and write it in new line each field with value and if an y field ot found then mention NA?"

            chain = LLMChain(llm=llm, prompt=prompt_template)
            response = chain.run({"text": text, "query": query})

            # Print response
            return jsonify({"content":response})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
