import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../features/openRegisterModal';
import axios from 'axios';

function RegisteModal({ clName, dsp }) {
    const isVisible = useSelector((state) => state.isVisible.value);
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        course: '',
        format: ''
    });
    
    const [errors, setErrors] = useState({
        fullName: false,
        phone: false,
        email: false,
        course: false,
        format: false
    });
    
    const [touched, setTouched] = useState({
        fullName: false,
        phone: false,
        email: false,
        course: false,
        format: false
    });

    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const changeVisible = () => {
        dispatch(setIsModalVisible(!isVisible));
        if (isVisible) {
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            email: '',
            course: '',
            format: ''
        });
        setErrors({
            fullName: false,
            phone: false,
            email: false,
            course: false,
            format: false
        });
        setTouched({
            fullName: false,
            phone: false,
            email: false,
            course: false,
            format: false
        });
        setSubmitAttempted(false);
        setSubmitError(null);
        setSubmitSuccess(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (touched[name] || submitAttempted) {
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let isValid = false;
        
        switch(name) {
            case 'fullName':
                isValid = value.trim().split(' ').length >= 3 && value.trim().length >= 5;
                break;
            case 'phone':
                isValid = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value);
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'course':
                isValid = value !== '';
                break;
            case 'format':
                isValid = value !== '';
                break;
            default:
                break;
        }
        
        setErrors(prev => ({
            ...prev,
            [name]: !isValid
        }));
    };

    // Функция для определения классов валидации
    const getValidationClass = (name) => {
        // Не показываем статус, если поле не было затронуто и нет попытки отправки
        if (!touched[name] && !submitAttempted) return '';
        
        // Если поле пустое - не показываем статус
        if (formData[name] === '') return '';
        
        // Возвращаем соответствующий класс в зависимости от валидности
        return errors[name] ? 'is-invalid' : 'is-valid';
    };

    const handleSubmit = async () => {
        setSubmitAttempted(true);
        setSubmitError(null);
        setSubmitSuccess(false);
        
        // Помечаем все поля как touched
        setTouched({
            fullName: true,
            phone: true,
            email: true,
            course: true,
            format: true
        });
        
        // Валидируем все поля
        Object.keys(formData).forEach(key => {
            validateField(key, formData[key]);
        });
        
        // Проверяем на пустые поля
        const hasEmptyFields = Object.values(formData).some(val => val === '');
        const hasErrors = Object.values(errors).some(error => error);
        
        if (hasEmptyFields) {
            setSubmitError('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        if (hasErrors) {
            setSubmitError('Пожалуйста, исправьте ошибки в форме');
            return;
        }
        
        try {
            setIsSubmitting(true);
            
            const response = await axios.post('http://localhost:5000/api/applications', formData);
            
            if (response.status === 200 || response.status === 201) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    resetForm();
                    changeVisible();
                }, 2000);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            setSubmitError(error.response?.data?.message || 'Произошла ошибка при отправке формы');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={clName} style={dsp} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={isVisible ? "false":"true"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Подать заявку</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={changeVisible}></button>
                    </div>
                    <div className="modal-body">
                        {submitSuccess ? (
                            <div className="alert alert-success">
                                Заявка успешно отправлена! Модальное окно закроется автоматически.
                            </div>
                        ) : (
                            <form>
                                <div className="row mb-3">
                                    <div className="col-sm-10 input-group">
                                        <input 
                                            type="text" 
                                            className={`form-control ${getValidationClass('fullName')}`}
                                            placeholder='ФИО'
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    {(touched.fullName || submitAttempted) && formData.fullName === '' && (
                                        <div className="text-danger small mt-1">Это поле обязательно для заполнения</div>
                                    )}
                                    {(touched.fullName || submitAttempted) && errors.fullName && formData.fullName !== '' && (
                                        <div className="text-danger small mt-1">Введите ФИО (минимум 3 слова)</div>
                                    )}
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-sm-10 input-group">
                                        <input 
                                            type="tel" 
                                            className={`form-control ${getValidationClass('phone')}`}
                                            placeholder='+7 999 888 77 66'
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    {(touched.phone || submitAttempted) && formData.phone === '' && (
                                        <div className="text-danger small mt-1">Это поле обязательно для заполнения</div>
                                    )}
                                    {(touched.phone || submitAttempted) && errors.phone && formData.phone !== '' && (
                                        <div className="text-danger small mt-1">Введите корректный номер телефона</div>
                                    )}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 input-group">
                                        <input 
                                            type="email" 
                                            className={`form-control ${getValidationClass('email')}`}
                                            placeholder='examle@mail.ru'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    {(touched.email || submitAttempted) && formData.email === '' && (
                                        <div className="text-danger small mt-1">Это поле обязательно для заполнения</div>
                                    )}
                                    {(touched.email || submitAttempted) && errors.email && formData.email !== '' && (
                                        <div className="text-danger small mt-1">Введите корректный email</div>
                                    )}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 input-group">
                                        <select 
                                            className={`form-select ${getValidationClass('course')}`}
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Выберите курс</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    {(touched.course || submitAttempted) && formData.course === '' && (
                                        <div className="text-danger small mt-1">Это поле обязательно для заполнения</div>
                                    )}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-10 input-group">
                                        <select 
                                            className={`form-select ${getValidationClass('format')}`}
                                            name="format"
                                            value={formData.format}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Выберите формат занятий</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    {(touched.format || submitAttempted) && formData.format === '' && (
                                        <div className="text-danger small mt-1">Это поле обязательно для заполнения</div>
                                    )}
                                </div>

                                {submitError && (
                                    <div className="alert alert-danger mt-3">
                                        {submitError}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        {!submitSuccess && (
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="ms-2">Отправка...</span>
                                    </>
                                ) : 'Отправить'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisteModal;