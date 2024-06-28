# Como instalar e executar a aplicação

### 1º Passo
Clone ou extraia este repositório para dentro de alguma pasta no seu computador.

### 2º Passo
O arquivo “create.sql” deve ser restaurado para uma base de dados nomeada “bitbus”, utilizando o PostgreSQL. A criação da base e importação dos scripts pode ser realizada via linha de comando ou através de um gerenciador como pgAdmin ou DBeaver. 
Na aplicação, a conexão com esta base está configurada para rodar com usuário “postgres” e senha “postgres”. Caso haja alguma variável diferente destas no banco de dados, elas podem ser alteradas através do arquivo application-dev.properties, localizado no backend, dentro do diretório src/main/resources.

### 3º Passo
Para rodar o backend da aplicação, deve-se importar a pasta “backend” para uma IDE que execute código fonte Java, como o IntelliJ ou Spring Tool Suite, e executar o programa, levando em conta que a máquina já tenha uma versão do jdk instalada, bem como as variáveis de ambiente do JAVA_HOME configuradas.
	
### 4º Passo
Já para o frontend, é necessário ter o NodeJS instalado na máquina com versão 20 ou superior. Após isso, basta abrir um terminal na pasta “frontend” e rodar os comandos “npm install” e “npm run dev”, os quais vão instalar as dependências e iniciar a aplicação, respectivamente. A partir desse ponto, a aplicação já pode ser acessada no navegador a partir do endereço “http://localhost:3000”.
