const express = require('express');
const server = express();
const { rastrearEncomendas } = require('correios-brasil');

server.listen(7000, () => {
    console.log('Server is running on port 7000')
});

server.get('/v1/sro-rastro/:code', async (req, res) => {
    let code = req.params.code
    let codRastreio = [code];
    try {
        let response = await rastrearEncomendas(codRastreio)
        console.log(response[0].eventos[0])

        if (response[0].modalidade == "V") {
            return res.sendStatus(422)
        }

        return res.send({ data: response[0] }
            
        );
    } catch (error) {
        console.log(error
            
            )
        return res.send({ error: error.message });
    }
});
