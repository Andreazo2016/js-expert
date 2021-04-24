export default class Marketing {
  update({ id, userName }) {
    //important lembrar que o update é responsável por gerenciar seus erros/exceptions
    //não deve-ser ter await no notify por que é de responsabilidade do notify é só emitir eventos
    //só notificar todo mundo
    console.log(`[${id}]: [shipment] will send a welcome email to ${userName}`)
  }
}