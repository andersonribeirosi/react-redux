import React from 'react'
import ProdutoService from '../../app/produtoService'

import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    msgSucesso: false,
    errors: []
}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const campo = event.target.name
        this.setState({ [campo]: valor })
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({ msgSucesso: true })
        } catch (erro) {
            const errors = erro.errors
            this.setState({ errors: errors })

        }

    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount() {
        // console.log(this.props.match);
        
        const sku = this.props.match.params.sku

        if(sku){
            const resultado = this.
                    service.
                    obterProdutos().filter( produto => produto.sku === sku )

            if(resultado.length === 1){
                const produtoEncontrado = resultado[0]
                this.setState({ ...produtoEncontrado })
            }
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>
                <div className="card-body">

                    {this.state.msgSucesso &&
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Produto cadastrado com sucesso!</strong>
                        </div>
                    }

                    {this.state.errors.length > 0 &&
                        this.state.errors.map(msg => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro!</strong> {msg}
                                </div>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <label>Nome: *</label>
                            <input onChange={this.onChange} type="text" name="nome" value={this.state.nome} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label>SKU: *</label>
                            <input onChange={this.onChange} type="text" name="sku" value={this.state.sku} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea onChange={this.onChange} name="descricao" value={this.state.descricao} className="form-control" />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Preço: *</label>
                            <input onChange={this.onChange} type="text" name="preco" value={this.state.preco} className="form-control" />
                        </div>

                        <div className="col-md-6">
                            <label>Fornecedor: *</label>
                            <input onChange={this.onChange} type="text" name="fornecedor" value={this.state.fornecedor} className="form-control" />
                        </div>

                    </div>

                    <div className="row mt-5">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-info">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CadastroProduto);