import carros from "../models/dados.js";

//Buscar itens
const getAllCarros = (req, res) => {
    const { id, nome, modelo, ano } = req.query;
    let resultado = carros;

    if(nome) {
        resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()))
    }
    if(id) {
        resultado = resultado.filter(b => b.id === id)
    }

    res.status(200).json({
        total: resultado.length,
        carross: resultado
    });
};

const getCarrosByld = (req, res) => {
    const id = parseInt(req.params.id);
    const carross = carros.find(b => b.id === id);

    if(!carros) {
        return res.status(404).json({
            message: "Carros não encontrado"
        });
    }

    res.status(200).json(carros);
};

const createCarros = (req, res) => {
    const { nome, id, modelo, ano } = req.body;

    if(!nome || !modelo) {
        return res.status(400).json({
            success: false,
            message: "Nome, modelo e cor são obrigatório"
        });
    }

    const novoCarros = {
        id: carros.length + 1,
        nome: nome,
        modelo: modelo,
        ano: ano,
        cor: cor,
        qntdVitorias: qntdVitorias
    };

    carros.push(novoCarros);
    res.status(201).json({
        success: true,
        message: "Nova Carros cadastrada com sucesso",
        carros: novoCarros
    });
};

//Deletar

const deleteCarros = (req, res) => {
    const id = parseInt(req.params.id);

    //Verificação
    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID selecionado é invalido"
        });
    }

    //Verificar se não tem outra Carros com o ID
    const carrosParaRemover = carros.find(b => b.id === id);

    if(!carrosParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Carros com o ID ${id} não existe`
        });
    }

    //Remover Carros com o ID
    const carrosFiltradas = carros.filter(carros => carros.id !== id);
    carros.slice(0, carros.length, ...carrosFiltradas);

    res.status(200).json({
        success: true,
        message: `A Carros ${id} foi removido com sucesso`
    })
};

//Update
const updateCarros = (req, res) => {
    //Ter logica do put update
    const id = parseInt(req.params.id);
    const { nome, modelo, cor,  ano } = req.body;

    //Renomear id
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser válido!"
        })
    }

    //Verificar se a Carros com Id: idParaEditar existe
    const carrosExiste = carros.find(b => b.id === idParaEditar);
    if(!carrosExiste){
        return res.status(404).json({
            sucess: false,
            message: "A Carros com o id " + idParaEditar + "é inexistente"
        })
    }

    //
    const carrosAtualizadas = carros.map(b => b.id === idParaEditar ? {
        ...carros,
        ...(nome && { nome }),
        ...(modelo &&  { modelo }),
        ...(ano &&  { ano }),
        ...(cor && {cor})
    }
        :carros
    )

    //Atualizar o Array
    carros.splice(0, carros.length, ...carrosAtualizadas);
    const carrosEditada = carros.find(b => b.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso da Carros",
        b: carrosExiste
    })
}

export { getAllCarros, getCarrosByld, createCarros, deleteCarros, updateCarros };