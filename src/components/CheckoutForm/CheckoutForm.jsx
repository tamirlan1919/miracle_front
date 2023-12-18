import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CheckoutForm = ({ totalPrice }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
      house: '',
      kv: '',
      paymentMethod: 'card', // Default to card payment
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submitting
    // ...

    // Dispatch an action to post the order with the form data and total price
  };

  return (
    <div>
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Номер телефона
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Страна
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Город
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Адрес
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="house" className="form-label">
            Дом
          </label>
          <input
            type="text"
            className="form-control"
            id="house"
            name="house"
            value={formData.house}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kv" className="form-label">
            Квартира
          </label>
          <input
            type="text"
            className="form-control"
            id="kv"
            name="kv"
            value={formData.kv}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Выберите метод оплаты</label>
          <div className="form-check">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
              className="form-check-input"
            />
            <label htmlFor="card" className="form-check-label">
              Банковская карта
            </label>
          </div>
          {/* You can add more payment methods here */}
        </div>
        <button type="submit" className="btn btn-primary">
          Завершить заказ
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
