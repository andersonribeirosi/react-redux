import React from 'react'
import ProdutoService from '../../app/produtoService'
import Card from '../../components/card'
import ProdutosTable from '../produtos/produtosTable'

import { withRouter } from 'react-router-dom'

class ConsultaProdutos extends React.Component {

    state = {
        produtos: []
    }

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const produtos = this.service.obterProdutos()
        this.setState({ produtos })
    }

    editar = (sku) => {
        console.log('Editando o sku: ', sku);

        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({ produtos })
    }

    render() {
        return (
            <Card header="Consulta Produtos">
                <ProdutosTable produtos={this.state.produtos}
                    editarAction={this.editar}
                    deletarAction={this.deletar} />
            </Card>
        )
    }
}

export default withRouter(ConsultaProdutos)