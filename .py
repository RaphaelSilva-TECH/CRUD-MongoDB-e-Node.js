from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['meubanco']
colecao = db['itens']

print("Bem-vindo ao banco de dados!")

while True:
    print("\nMENU:"
          "\n1 - Adicionar algo ao banco de Dados"
          "\n2 - Remover algo do Banco de Dados"
          "\n3 - Listar o Banco de Dados"
          "\n4 - Sair")
    var = input("O que deseja fazer?: ")

    if var == "1":
        dado = input("Digite o que deseja adicionar: ")
        colecao.insert_one({"nome": dado})
        print(dado, "adicionado com sucesso!")
    elif var == "2":
        dado = input("Digite o que deseja remover: ")
        resultado = colecao.delete_one({"nome": dado})
        if resultado.deleted_count > 0:
            print(dado, "removido com sucesso")
        else:
            print(dado, "não encontrado no banco")
    elif var == "3":
        print("Banco de Dados:")
        for item in colecao.find():
            print("-", item["nome"])
    elif var == "4":
        print("Saindo do programa...")
        break
    else:
        print("Opção inválida. Tente novamente.")
