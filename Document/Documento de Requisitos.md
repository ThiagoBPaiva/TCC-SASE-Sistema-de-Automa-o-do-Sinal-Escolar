# Documento de Requisitos
## SASE - Sistema de Automação do Sinal Escolar

**Versão:** 1.0
**Data:** 30/07/2026
**Autor:** Thiago Rodrigues

---

# 1. Objetivo

O Sistema de Automação do Sinal Escolar (SASE) tem como objetivo automatizar o acionamento do sinal da Escola Estadual João Alves de Melo, eliminando a necessidade de operação manual e proporcionando maior organização à rotina escolar.

O sistema permitirá que responsáveis autorizados realizem o gerenciamento dos horários por meio de uma interface web integrada a um Arduino Uno, responsável pelo acionamento físico da campainha.

Além da automação do sinal, o sistema oferecerá recursos para gerenciamento de diferentes grupos de horários, calendário escolar e sincronização automática das configurações com o dispositivo responsável pelo acionamento do sinal.

---

# 2. Escopo

O projeto contempla o desenvolvimento de uma aplicação web integrada a um Arduino Uno para controlar automaticamente o sinal escolar.

O sistema será composto por:

- Interface administrativa;
- API Backend;
- Banco de Dados MySQL;
- Firmware para Arduino;
- Comunicação Serial USB.

Não fazem parte deste projeto:

- Aplicativo Mobile;
- Comunicação via Internet (Wi-Fi);
- Controle remoto por dispositivos móveis;
- Integração com outros sistemas escolares.

---

# 3. Requisitos Funcionais

| Código | Descrição |
|---------|-----------|
| RF01 | O sistema deverá solicitar uma senha de acesso antes de permitir o gerenciamento das configurações. |
| RF02 | O sistema deverá permitir cadastrar grupos de horários. |
| RF03 | O sistema deverá permitir editar grupos de horários. |
| RF04 | O sistema deverá permitir excluir grupos de horários. |
| RF05 | O sistema deverá permitir cadastrar horários em cada grupo. |
| RF06 | O sistema deverá permitir editar horários cadastrados. |
| RF07 | O sistema deverá permitir remover horários cadastrados. |
| RF18 | O sistema deverá permitir definir um grupo de horários para datas específicas do calendário escolar. |
| RF19 | O sistema deverá sincronizar automaticamente as alterações com o Arduino. |
| RF10 | O sistema deverá exibir o estado da comunicação com o Arduino. |
| RF11 | O sistema deverá permitir o acionamento manual do sinal. |
| RF12 | O sistema deverá permitir pausar temporariamente o funcionamento automático (Modo Emergência). |
| RF13 | O sistema deverá permitir reativar o funcionamento automático após o modo emergência. |
| RF14 | O sistema deverá permitir configurar a duração do toque do sinal. |
| RF15 | O sistema deverá registrar alterações administrativas realizadas pelos usuários. |
| RF16 | O sistema deverá permitir exportar um backup das configurações. |
| RF17 | O sistema deverá permitir restaurar um backup previamente exportado. |
| RF18 | O sistema deverá apresentar um painel com informações do funcionamento do sistema. |

---

# 4. Requisitos Não Funcionais

| Código | Descrição |
|---------|-----------|
| RNF01 | O sistema deverá possuir interface simples e intuitiva. |
| RNF02 | O backend deverá ser desenvolvido utilizando Node.js e TypeScript. |
| RNF03 | O firmware deverá ser desenvolvido utilizando C++ para Arduino. |
| RNF04 | O banco de dados deverá utilizar MySQL. |
| RNF05 | A comunicação entre sistema e Arduino deverá ocorrer via Serial USB. |
| RNF06 | As senhas deverão ser armazenadas utilizando criptografia (Hash). |
| RNF07 | O acesso ao sistema deverá ser protegido por um mecanismo de autenticação baseado em senha. |
| RNF08 | O sistema deverá possuir arquitetura modular. |
| RNF09 | O código deverá seguir boas práticas de desenvolvimento. |
| RNF10 | O sistema deverá ser compatível com os principais navegadores modernos. |
| RNF11 | O sistema deverá preservar as configurações após reinicialização da aplicação. |
| RNF12 | O sistema deverá permitir fácil manutenção e evolução do código. |

---

# 5. Regras de Negócio

## RN01 - Autenticação

Somente usuários previamente cadastrados poderão acessar o sistema.

---

## RN02 - Controle de Acesso

Apenas usuários com permissão administrativa poderão alterar horários, usuários e configurações do sistema.

---

## RN03 - Grupos de Horários

Cada grupo deverá possuir um nome único.

Exemplos:

- Horário Normal
- Horário Reduzido
- Horário de Provas
- Horário de Eventos

---

## RN04 - Calendário Escolar

Uma data poderá possuir apenas um grupo de horários ativo.

Na ausência de uma configuração específica para determinada data, deverá ser utilizado o grupo padrão do sistema.

---

## RN05 - Horários

Não será permitido cadastrar horários duplicados dentro do mesmo grupo.

---

## RN06 - Duração do Toque

A duração do toque deverá ser um valor inteiro positivo definido em segundos.

---

## RN07 - Sincronização

Sempre que ocorrer alteração nos horários ou configurações, o sistema deverá sincronizar automaticamente as informações com o Arduino.

---

## RN08 - Comunicação

Caso a comunicação com o Arduino seja interrompida, o sistema deverá informar o usuário por meio da interface administrativa.

---

## RN09 - Acionamento Manual

O acionamento manual do sinal poderá ser realizado somente por usuários autenticados.

---

## RN10 - Modo Emergência

Enquanto o Modo Emergência estiver ativo, nenhum horário automático deverá ser executado.

---

## RN11 - Backup

O backup deverá conter todas as configurações necessárias para restaurar completamente o sistema.

---

## RN12 - Exclusão de Grupos

Um grupo de horários não poderá ser removido caso esteja associado a alguma data do calendário escolar.

---

## RN13 - Integridade

Toda alteração realizada no sistema deverá preservar a consistência das informações armazenadas.

---

# 6. Considerações

Este documento define os requisitos iniciais do Sistema de Automação do Sinal Escolar (SASE) e servirá como base para o desenvolvimento do software. Alterações ou novas funcionalidades poderão ser incorporadas conforme a evolução do projeto, desde que devidamente documentadas.
