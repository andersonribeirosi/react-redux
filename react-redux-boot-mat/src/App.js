import React from 'react';

class App extends React.Component {

  state = {
    nome: ''
  }

  alterarNome = (event) => {
    this.setState({
      nome: event.target.value
    })
  }

  criaComboBox = () => {
    const opcoes = ['Anderson Ribeiro', 'Juliana Borges', 'Jaqueline Borges']
    const comboBoxOpcoes = opcoes.map(opcao => <option>{opcao}</option>)

    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }

  componentDidMount(){
    console.log("Executou o DidMount");
    
  }

  render() {
    console.log("Executou o render");
    

    //Outra forma de chamar uma função (Criando um componente e chamando em uma tag)
    const MeuComboBox = () => this.criaComboBox()

    return (
      // (React.Fragment) Permitir inserir varias linhas de HTML ou apenas <> </>
      <React.Fragment>
        <input className="text-centralizado" type="text" value={this.state.nome} onChange={this.alterarNome}></input>
        <h1>Nome: {this.state.nome}</h1>
        {this.criaComboBox()}
        <MeuComboBox></MeuComboBox>
      </React.Fragment>
    )
  }

}

export default App;
