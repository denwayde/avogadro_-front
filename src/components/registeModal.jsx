import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../features/openRegisterModal';

function RegisteModal({clName, dsp}) {
    const isVisible = useSelector((state) => state.isVisible.value);
    const dispatch = useDispatch();

    const changeVisible = () => {
        dispatch(setIsModalVisible(isVisible === false ? true :  false));
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
            <form>
                <div className="row mb-3">
                    <div className="col-sm-10 input-group">
                    <input type="text" className="form-control" placeholder='ФИО'/>
                    <span className="input-group-text">✔</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 input-group">
                    <input type="phone" className="form-control" placeholder='+7 999 888 77 66'/>
                    <span className="input-group-text">✔</span>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 input-group">
                        <input type="email" className="form-control" placeholder='examle@mail.ru'/>
                        <span className="input-group-text">✔</span>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 input-group">
                        <select className="form-select">
                            <option value="">Выберите курс</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <span className="input-group-text">✔</span>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 input-group">
                        <select className="form-select">
                            <option value="">Выберите формат занятий</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <span className="input-group-text">✔</span>
                    </div>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button type="button" className="btn btn-primary">Отправить</button>
            </div>
          </div>
        </div>
      </div> 
    )
}

export default RegisteModal
