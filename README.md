# DesafioZap

## Informações

Esse projeto utiliza o Angular com a biblioteca [Ant Design](https://ng.ant.design/docs/introduce/en), uma UI library desevolvida de acordo com as especificações da comunidade Angular.

## Instalação

Abra um terminal nesse diretório e então instale todas dependências  com `npm install`.

## Rodar localmente, servidor de desenvolvimento

Utilize o servidor embutido do Angular para rodar localmente em desenvolvimento. Rode `ng serve` e navegue em `http://localhost:4200/`.

## Build

É necessário que tenha o **npm** e o Angular [previamente instalado](https://angular.io/guide/quickstart).

Para rodar em produção, rode o comando `ng build --prod --aot --build-optimizer --optimization`. Após terminar o processo, será criado uma nova pasta `dist/`. A partir de agora você tem duas escolhas:

1. Utilizar algum servidor para hospedar os arquivos e direcionar todas as requisições para o index, veja o `default.conf` como exemplo.

2. Em um server com [**docker** instalado](https://www.docker.com/get-started) execute o comando `docker-compose up -d --build` , em um terminal nessa pasta, que você tem um servidor rodando com tudo configurado. O Resultado é uma imagem com apenas **~20MB**.

# How It Works

A timeline somente pode ser acessada por usuário logada. A tela de feedback e a de erro são de livre acesso. Após logar o usuário é direcionado para a timeline, onde será carregado todos os posts.

O *timeline component* solicita que a *api service* pegue os posts por uma requisição *GET* no endpoint, se houver erro, o usuário será redirecionado para a tela de erro. Após carregado a lista, o *timeline component* carrega o header do post, *post-header*, que contém o cabeçalho do post. Depois é verificado o tipo do post e "incorporado" o *post-banner*, *post-image* ou *post-video*. Para facilitar a organização dos posts, foi criado o **PostModule** que contém todos arquivos necessários para exibir um post.