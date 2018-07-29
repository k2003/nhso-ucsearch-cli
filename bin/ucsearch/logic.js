const soap = require('soap');
const config = require('../../config');

const search = ({token, cid}) => {
  if (!/(\d{13})\#([A-Za-z0-9]{1,})/.test(token)) {
    console.log('Invalid token!');
    return;
  }
  if (!/^(\d{13})$/.test(cid)) {
    console.log('Invalid cid!');
    return;
  }
  
  const args = {
    user_person_id: token.split('#')[0],
    smctoken: token.split('#')[1],
    person_id: cid,
  };

  
  soap.createClient(config.NHSO_UC_WSDL, (err, client) => {
    if (err) return console.log(err);

    client.searchCurrentByPID(args, (err, result) => {
      if (err) return console.log(err);
      
      if (result.return.ws_status !== 'NHSO-000001') {
        return console.log(`[NHSO WS] Not success with status: ${result.return.ws_status}, ${result.return.ws_status_desc}`);
      }

      console.log({data: {...result.return}});      
    });
  });

}

module.exports = {
  search,
}