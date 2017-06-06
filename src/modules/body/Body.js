import React, { Component } from 'react';
import shoot from '../../js/physics';
import { Armor, PropInput, Bullet } from '../elements';

class Body extends Component {
  constructor() {
    super();
    this.shoot = this.shoot.bind(this);
    this.onChangeArmorProps = this.onChangeArmorProps.bind(this);
    this.onChangeBulletProps = this.onChangeBulletProps.bind(this);

    this.state = {
      armor: {
        thickness: 30,
        width: 200,
        rotation: 0,
        x: 36,
        y: 80,
      },
      bullet: {
        penetration: 35,
        direction: 0,
        damage: 100,
        // explosionDamage: 300,
        x: 130,
        y: 94,
      },
    };
  }

  shoot() {
    const {
      armor,
      bullet,
    } = this.state;
    shoot(armor, bullet);
  }

  onChangeArmorProps(e) {
    const value = e.currentTarget.value;
    const param = e.currentTarget.dataset.param;

    this.setState({
      armor: {
        ...this.state.armor,
        [param]: parseInt(value),
      },
    });
  }

  onChangeBulletProps(e) {
    const value = e.currentTarget.value;
    const param = e.currentTarget.dataset.param;

    this.setState({
      bullet: {
        ...this.state.bullet,
        [param]: parseInt(value),
      },
    });
  }

  render() {
    const {
      armor,
      bullet,
    } = this.state;

    return (
      <div className="main">
        <div className="battlefield" >
          <svg width="300" height="200">
            <Armor
              { ...armor }
            />
            <Bullet
              { ...bullet }
            />
          </svg>
        </div>
        <button onClick={this.shoot}>
          Shoot!
        </button>
        <div>
          <span>Armor properties:</span>
          {
            Object.keys(armor).map((key, idx) => {
              return (
                <PropInput
                  key={idx}
                  dataParam={key}
                  dataValue={armor[key]}
                  onDataChange={this.onChangeArmorProps}
                />
              );
            })
          }
        </div>
        <div>
          <span>Bullet properties:</span>
          {
            Object.keys(bullet).map((key, idx) => {
              return (
                <PropInput
                  key={idx}
                  dataParam={key}
                  dataValue={bullet[key]}
                  onDataChange={this.onChangeBulletProps}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
};

export default Body;
