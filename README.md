# PGTATS - Automação Web com Cypress

![Cypress Tests](https://github.com/charlesbdl/PGTATS-AUTOMACAO-WEB/actions/workflows/cypress-tests.yml/badge.svg)
![Cypress Version](https://img.shields.io/badge/cypress-13.7.3-brightgreen)
![Node Version](https://img.shields.io/badge/node-20.x-brightgreen)
![Tests](https://img.shields.io/badge/tests-9%20passing-success)

Projeto de automação de testes E2E para o site [Automation Exercise](https://automationexercise.com) utilizando Cypress, Page Objects e XPath.

## 🛠️ Tecnologias

- **Cypress** 13.7.3 - Framework de testes E2E
- **cypress-xpath** 2.0.1 - Suporte a seletores XPath
- **JUnit Reporter** - Relatórios XML para CI/CD
- **GitHub Actions** - CI/CD Pipeline

## 📋 Arquitetura

O projeto segue o padrão **Page Objects** para melhor organização e manutenção:

```
cypress/
├── e2e/                    # Test cases
│   ├── TrabalhoFinal.cy.js
├── pages/                  # Page Objects
│   ├── RegisterPage.js
│   ├── LoginPage.js
│   ├── ContactPage.js
│   ├── ProductsPage.js
│   ├── FooterPage.js
│   └── CartPage.js
├── fixtures/               # Test data
├── screenshots/            # Falhas capturadas
└── support/                # Configurações e comandos
```

## 🚀 Instalação

```bash
# Instalar dependências
npm install
```

## ▶️ Executando os Testes

### Modo Interativo (Cypress UI)
```bash
npm run cypress:open
```

### Modo Headless (CLI)
```bash
# Executar todos os testes
npm test

# Executar com navegador visível
npm run test:headed

# Executar no Chrome
npm run test:chrome

# Executar e gerar relatório HTML
npm run test:report
```

## 📊 Relatórios

Os relatórios JUnit XML são gerados automaticamente após a execução dos testes:

### Localmente
```bash
# Executar testes e gerar relatório XML
npm test

# Ver relatório gerado
cat cypress/reports/junit/*.xml
```

### CI/CD (GitHub Actions)

#### 📊 Ver Resultados no GitHub Actions

1. **Acesse a aba Actions:**
   ```
   https://github.com/charlesbdl/PGTATS-AUTOMACAO-WEB/actions
   ```

2. **Clique no workflow mais recente**

3. **Ver Resumo dos Testes:**
   - Clique em **"Summary"** (sempre disponível)
   - Veja estatísticas: ✅ Passed, ❌ Failed, ⏱️ Duration

4. **Baixar Artifacts:**
   - Scroll até "Artifacts" no final da página
   - Baixe:
     - `junit-test-results` - Relatórios XML
     - `test-artifacts` - Todos os arquivos

## 🧪 Test Cases Implementados

| ID | Descrição | Status |
|----|-----------|--------|
| TC1 | Register User | ✅ |
| TC2 | Login e Logout | ✅ |
| TC3 | Login com credenciais incorretas | ✅ |
| TC4 | Logout User | ✅ |
| TC5 | Register com email existente | ✅ |
| TC6 | Contact Us Form | ✅ |
| TC8 | Verify All Products e detail page | ✅ |
| TC9 | Search Product | ✅ |
| TC10 | Verify Subscription in home page | ✅ |
| TC15 | Place Order: Register before Checkout | ✅ |

## 🎯 Estratégia de Seletores

O projeto utiliza uma abordagem **híbrida CSS + XPath**:

- **CSS Selectors**: Para elementos com IDs/classes bem definidas
- **XPath**: Para navegação complexa no DOM e seleção por texto

Exemplo:
```javascript
// CSS
cy.get('[data-qa="signup-name"]').type(name);

// XPath
cy.xpath('//h2[contains(text(), "Account Created!")]');

// Híbrido
cy.contains('button', 'Continue Shopping').click();
```

## 🔄 CI/CD Pipeline

O projeto possui pipeline completo no GitHub Actions que:

1. ✅ Executa todos os testes em cada push/PR
2. 📸 Captura screenshots e vídeos
3. 📊 Gera relatórios JUnit XML (padrão indústria)
4. 📈 Mostra resumo visual no GitHub Actions Summary
5. � Salva artifacts (XMLs, vídeos, screenshots)
6. ⚡ Compatível com qualquer plataforma CI/CD
