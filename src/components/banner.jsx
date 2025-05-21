import React from 'react'

function Banner() {
    return (
        <>
        <section className='baner-area'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-7 d-flex align-items-center justify-content-center baner-text-wrapper">
                        <div className="baner-text">
                            <h1>Приветствуем в Школе Авогадро</h1>
                            <p>Объединяем любознательных детей, подростков и взрослых,<br/>которых учат лучшие эксперты с реальными достижениями!</p>
                            <a href="#" className="btn btn-warning btn-lg">Подробнее</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Banner
