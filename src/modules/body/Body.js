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
      tank: {
        hp: 500,
      },
      armor: {
        thickness: 10,
        width: 100,
        rotation: 0,
        x: 100,
        y: 50,
      },
      bullet: {
        penetration: 20,
        direction: 0,
        damage: 100,
        // explosionDamage: 300,
        x: 100,
        y: 100,
      },
      output: {
        actualThickness: null,
        damage: null,
        penetration: null,
      },
    };
  }

  shoot() {
    const {
      armor,
      bullet,
      tank,
    } = this.state;
    const shot = shoot(armor, bullet);
    const tankHp = tank.hp - shot.damage;

    this.setState({
      output: shot,
      tank: {
        ...tank,
        hp: tankHp,
      },
    });
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
      tank: {
        hp,
      },
      armor,
      bullet,
      output,
      output: {
        message,
      },
    } = this.state;

    return (
      <div className="main">
        <div className="battlefield" >
          <svg width="600" height="200">
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
        <div>
          <p>Output: {message}</p>
          <p>Tank hp: {hp}</p>
        </div>
      </div>
    );
  }
};

export default Body;
