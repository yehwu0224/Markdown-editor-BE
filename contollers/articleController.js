import Article from "../models/article";
import { Op }  from 'sequelize'

const create = async (req, res, next) => {
    if (!req.body.title) {
        res.status(400).send({ message: `Title can not be empty!` });  // 400: Bad Request
        return;
    }

    const article = {
        title: req.body.title,
        content: req.body.content
    };

    Article.create(article).then((article) => {
        article.setUser(req.userId).then((result) => {
            res.send(result);
        })
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
}

const findAll = (req, res, next) => {
    Article.findAll({where: {UserId: req.userId}}).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send({ message: error })
    })
}

const findOne = (req, res, next) => {
    const id = req.params.id;
    Article.findByPk(id).then((result) => {
        if(result) res.send(result);
        else res.status(400).send({ message: `Cannot find Article with id = ${id}` }); // 模板字串
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
}

const update = (req, res, next) => {
    const id = req.params.id;

    const article = {
        title: req.body.title,
        content: req.body.content
    };

    Article.update( article, { where: {[Op.and]:[{id: id, UserId: req.userId}]} })
    .then((num) => {
        if(num != 0) res.send({ message: `${num} rows were affected` });
        else res.status(400).send({ message: `Cannot update Article with id = ${id}` }); // 模板字串
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
}

const deleteOne = (req, res, next) => {
    const id = req.params.id;
    
    Article.destroy({ 
        where: {[Op.and]:[{id: id, UserId: req.userId}]}
        // WHERE id == id AND UserId == req.userId
    }).then((num) => {
        if(num) res.send({ message: `${num} rows were affected` });
        else res.status(400).send({ message: `Cannot delete Article with id = ${id}` }); // 模板字串
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
}


export default { create, findAll, findOne, update, deleteOne }