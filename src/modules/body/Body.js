import React, { Component } from 'react';
import { shoot, getClosestItem } from '../../js/physics';
import { Armor, PropInput, Bullet } from '../elements';
let done = false;
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
          id: '1',
          name: 'Armor 1',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 100,
          hp: 100,
          x: 100,
          y: 50,
        },
        2: {
          id: '2',
          name: 'Armor 2',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 100,
          hp: 100,
          x: 100,
          y: 100,
        },
        3: {
          id: '3',
          name: 'Armor 3',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 100,
          hp: 100,
          x: 100,
          y: 150,
        },
      },
      bullet: {
        id: 'bullet',
        direction: 0,
        penetration: 50,
        calibre: 2,
        damage: 100,
        range: 3000,
        x: 100,
        y: 200,
      },
    };
  }

  shoot({ armorMap, armor }, bullet, ignoreId) {
    let newState = { armorMap, armor };
    const closestItem = getClosestItem(armorMap, armor, bullet, ignoreId);

    if (closestItem.actualItem) {
      const shot = shoot(closestItem.actualItem, bullet);
      let remainingHp = armor[shot.id].hp - shot.damage;
      if (remainingHp < 0) remainingHp = 0;
      newState = {
        armor: {
          ...armor,
          [shot.id]: {
            ...armor[shot.id],
            hp: remainingHp,
          },
        },
        armorMap,
      };
      const remainingPen = bullet.penetration - shot.actualThickness;
      if (remainingPen > 0) {
        let newBullet = { ...bullet };
        newBullet.x = closestItem.X.x;
        newBullet.y = closestItem.X.y;
        newBullet.penetration = remainingPen;
        this.shoot(newState, newBullet, shot.id);
      } else {
        done = true;
      }
    } else {
      done = true;
    }

    if (done) {
      this.setState({ ...this.state, ...newState });
      done = false;
    }
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
    } = this.state;

    return (
      <div className="main">
        <div className="head">
          <button onClick={() => { this.shoot(this.state, bullet) }}>
            Shoot!
          </button>
        </div>
        <div className="controls">
          <div>
            <h4>Bullet properties:</h4>
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
              armorMap.map((a, idx) => (
                <div key={idx}>
                  <h4>{armor[a].name}:</h4>
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
        </div>
        <div className="battlefield" >
          <svg width="800" height="800">
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
      </div>
    );
  }
};

export default Body;
