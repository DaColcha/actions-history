import { readFileSync } from 'fs';

let accionesPosibles = {};

try {
    // Leer Json de acciones posibles
    const data = readFileSync('../assets/acciones-posibles.json', 'utf8');

    // Convertir Json a objeto javascript
    accionesPosibles = JSON.parse(data);
} catch (err) {
    console.error(err);
}

export async function getActionCurrentPrice(actionName) {
    let currentPrice = 0;

    // Iterar en nivel 1 (numero de accion)
    for (const key in accionesPosibles) {
        if (accionesPosibles.hasOwnProperty(key)) {
            const outerObject = accionesPosibles[key];

            // Iterar en nivel 2 (nombre de accion)
            for (const innerKey in outerObject) {
                if (outerObject.hasOwnProperty(innerKey) && (innerKey === actionName)) {
                    const innerObject = outerObject[innerKey];
                    const url = `https://api.databursatil.com/v1/precios?token=359ea58dea56aa235004f8c08fbc3a&emisora_serie=${actionName}${innerObject[0].Serie}&bolsa=BIVA,BMV`
                    
                    currentPrice = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((data) => {
                            if (data.BIVA.ultimo === 0) {
                                return (data.BMV.ultimo * 0.059).toFixed(2);
                            } else {
                                return (data.BIVA.ultimo * 0.059).toFixed(2);
                            }
                        })
                        .catch((error) => {
                            console.error("Fetch error:", error);
                            throw error;
                        });
                }
            }
        }
    }

    return currentPrice;
}
