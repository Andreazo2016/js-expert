import { describe, expect, test, jest, beforeAll } from '@jest/globals'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'


describe('Test Suite for Observable Pattern', () => {

  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => { })
  })
  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data
    subject.subscribe(observer)
    subject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })
  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifierSpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    )

    const data = { name: 'Andreazo Silva', id: Date.now() }
    payment.creditCard(data)
    expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)
  })
  test('#All should notify subscribers after credit card', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)
    const shipmentObserver = new Shipment()
    const marketingObserver = new Marketing()

    const shipmentObserverSpy = jest.spyOn(shipmentObserver, shipmentObserver.update.name)
    const marketingObserverSpy = jest.spyOn(marketingObserver, marketingObserver.update.name)

    subject.subscribe(shipmentObserver)
    subject.subscribe(marketingObserver)

    const data = { name: 'Andreazo Silva', id: Date.now() }
    payment.creditCard(data)
    expect(shipmentObserverSpy).toHaveBeenCalledWith(data)
    expect(marketingObserverSpy).toHaveBeenCalledWith(data)


  })
})