from langchain.llms import Cohere
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

llm = Cohere(cohere_api_key="BjVVZhgU55bT1eniek8XRPLi5hTKilu8HkShtMC2")

template = """
You are a financial analyst. Based on the reconciled data:
{data}

Generate a monthly financial summary in plain English.
"""

prompt = PromptTemplate.from_template(template)

def generate_summary(data):
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain.run(data=data)
