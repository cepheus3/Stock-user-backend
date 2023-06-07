exports.verifypayment = (req, res) => {
    const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
    const CHAPA_AUTH = process.env.CHAPA_AUTH // || register to chapa and get the key
    const config = {
        headers: {
            Authorization: `Bearer ${CHAPA_AUTH}`
        }
    }
    console.log(req.params.id,"parrrammmss")
    
        //verify the transaction 
       /*   axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
            .then((response) => {
                console.log("Payment was successfully verified")
            }) 
            .catch((err) => console.log("Payment can't be verfied", err))
     */
}