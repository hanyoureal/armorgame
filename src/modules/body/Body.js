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
      armorMap: [1, 2, 3],
      armor: {
        1: {
          id: 1,
          name: 'Armor 1',
          thickness: 10,
          width: 100,
          rotation: 0,
          x: 100,
          y: 50,
        },
        2: {
          id: 2,
          name: 'Armor 2',
          thickness: 10,
          width: 100,
          rotation: 0,
          x: 100,
          y: 100,
        },
        3: {
          id: 3,
          name: 'Armor 3',
          thickness: 10,
          width: 100,
          rotation: 0,
          x: 100,
          y: 150,
        }
      },
      bullet: {
        penetration: 20,
        direction: 0,
        damage: 100,
        // explosionDamage: 300,
        x: 100,
        y: 100,
      },
      output: [],
      // output: {
      //   actualThickness: null,
      //   damage: null,
      //   penetration: null,
      // },
    };
  }

  shoot() {
    const {
      armorMap,
      armor,
      bullet,
    } = this.state;
    const shot = armorMap.map((a) => shoot(armor[a], bullet));

    this.setState({
      output: shot,
    });
  }

  onChangeArmorProps(e) {
    const {
      armorMap,
      armor,
    } = this.state;
    const target = e.currentTarget;

    const value = target.value;
    const param = target.dataset.param;
    const id = target.dataset.id;

    this.setState({
      armor: {
        ...this.state.armor,
        [id]: {
          ...this.state.armor[id],
          [param]: parseInt(value),
        },
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
      armorMap,
      armor,
      bullet,
      output,
    } = this.state;

    return (
      <div className="main">
        <div className="battlefield" >
          <svg width="600" height="200">
            {
              armorMap.map((a, idx) => (
                  <Armor
                    key={idx}
                    { ...armor[a] }
                  />
                )
              )
            }
            <Bullet
              { ...bullet }
            />
          </svg>
        </div>
        <button onClick={this.shoot}>
          Shoot!
        </button>
        <div>
          {
            armorMap.map((a, idx) => (
              <div key={idx}>
                <span>{armor[a].name}:</span>
                  {
                    Object.keys(armor[a]).map((key, idxx) => {
                    return (
                      (typeof armor[a][key] === 'number') ?
                        <PropInput
                          id={armor[a].id}
                          key={idxx}
                          dataParam={key}
                          dataValue={armor[a][key]}
                          onDataChange={this.onChangeArmorProps}
                        />
                      :
                      null
                    );
                  })
                }
                </div>
            ))
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
        {
          output.map((o, idx) => (
            <p key={idx}>Output: {o.message}</p>
          )
        )}
        </div>
      </div>
    );
  }
};

export default Body;
