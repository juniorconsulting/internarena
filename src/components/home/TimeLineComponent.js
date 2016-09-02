import React from 'react';
import {Glyphicon} from 'react-bootstrap';
require('../../styles/home/HomePage.scss');

class TimeLineComponent extends React.Component {
  render() {
    const innerUserIcon = <Glyphicon bsClass="glyphicon usericon" glyph="user" />;
    const timeIcon = <Glyphicon bsClass="glyphicon time" glyph="time" />;
    const image = "https://www.klm.com/travel/en/images/1BE3A2A3-BEB3-44E8-9399-DDA4A81E6FEA_tcm493-532775_456x456_80.jpg";

    return (
      <div className="container">
        <ul className="timeline">
          <li className="timeline-inverted">
            <div className="timeline-badge success">{innerUserIcon}</div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">ANSATTE</h4>
                <p><small className="text-muted">{timeIcon} 11 hours ago</small></p>
              </div>
              <div className="timeline-body">
                <div className="col-sm-8 row">
                  <h3>Mats oppdaterte sin personalia</h3>
                </div>
                <div className="col-sm-4 pull-right">
                  <img
                    src={image}
                    className="img-circle img-responsive"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-badge success">{innerUserIcon}</div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Mussum ipsum cacilds</h4>
                <p><small className="text-muted">{timeIcon} 11 hours ago via Twitter</small></p>
              </div>
              <div className="timeline-body">
                <p>
                  Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis.
                  Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis.
                  Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
                  Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci
                  latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
                </p>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-badge success">{innerUserIcon}</div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Mussum ipsum cacilds</h4>
                <p><small className="text-muted">{timeIcon} 11 hours ago via Twitter</small></p>
              </div>
              <div className="timeline-body">
                <p>
                  Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis.
                  Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis.
                  Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
                  Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci
                  latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default TimeLineComponent;
