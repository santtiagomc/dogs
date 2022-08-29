const axios = require ("axios");
const { Dogs, Temperament } = require ("../db");
const { YOUR_API_KEY } = process.env;


const getApiInfo = async () => {
    const apiUrl = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            min_weight: Number(el.weight.metric.slice(0,2)),
            max_weight: Number(el.weight.metric.slice(4)),
            min_height: Number(el.height.metric.slice(0,2)),
            max_height: Number(el.height.metric.slice(4)),
            temperament: el.temperament,
            life_span: el.life_span,
            image: `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`
        }
    })
    // console.log(apiInfo);
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dogs.findAll ({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};
// console.log(getDbInfo);

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports = { getAllDogs }