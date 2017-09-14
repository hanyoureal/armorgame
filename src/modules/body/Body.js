import React, { Component } from 'react';
import { shoot, getClosestItem, getHitAngle, getHitAngleSign } from '../../js/physics';
import { Armor, PropInput, Bullet, Shot } from '../elements';
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
          width: 120,
          rotation: 0,
          iHp: 200,
          hp: 200,
          x: 100,
          y: 100,
        },
        2: {
          id: '2',
          name: 'Armor 2',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 200,
          hp: 200,
          x: 100,
          y: 200,
        },
        3: {
          id: '3',
          name: 'Armor 3',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 200,
          hp: 200,
          x: 100,
          y: 300,
        },
        4: {
          id: '4',
          name: 'Armor 4',
          thickness: 10,
          width: 100,
          rotation: 0,
          iHp: 200,
          hp: 200,
          x: 100,
          y: 400,
        },
      },
      bullet: {
        id: 'bullet',
        direction: 0,
        penetration: 100,
        calibre: 2,
        damage: 100,
        range: 2000,
        x: 100,
        y: 600,
      },
      shotsMap: {},
    };
  }

  shoot({ armorMap, armor }, bullet, ignoreId, shotsMap = {}) {
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

      // Calculate ricoche
      let ricocheDirection = 0;
      const hitAngle = getHitAngle(closestItem.actualItem, bullet);
      const ricocheAngle = (180 - hitAngle) * 2;
      let ricochePercent = (shot.actualThickness / bullet.penetration * 100) * ((hitAngle - 90) / 90);

      if (ricochePercent > 100) ricochePercent = 100;
      const hitAngleSign = getHitAngleSign(closestItem.actualItem, bullet);
      ricocheDirection = ricocheAngle / 100 * ricochePercent;
      if (hitAngleSign) ricocheDirection = -Math.abs(ricocheDirection);
      let remainingPen;
      if (Math.abs(ricocheDirection) < ricocheAngle/2) {
        remainingPen = bullet.penetration - shot.actualThickness;
      } else {
        remainingPen = bullet.penetration - (bullet.penetration * ricocheAngle/2/90);
      }
      // ---

      let newBullet = { ...bullet };
      newBullet.x = closestItem.X.x;
      newBullet.y = closestItem.X.y;
      newBullet.penetration = remainingPen;
      newBullet.direction = newBullet.direction + ricocheDirection;

      // Add shots to show on the map
      shotsMap[Object.keys(shotsMap).length] = {
        x1: bullet.x,
        y1: bullet.y,
        x2: closestItem.X.x,
        y2: closestItem.X.y,
        calibre: bullet.calibre,
      };

      if (remainingPen > 0) {
        this.shoot(newState, newBullet, shot.id, shotsMap);
      } else {
        done = true;
      }
    } else {
      // Add shots to show on the map
      shotsMap[Object.keys(shotsMap).length] = {
        x1: bullet.x,
        y1: bullet.y,
        range: bullet.range,
        direction: bullet.direction,
        calibre: bullet.calibre,
      };
      done = true;
    }

    if (done) {
      this.setState({ ...this.state, ...newState, shotsMap });
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
      shotsMap,
    } = this.state;

    const shots = Object.keys(shotsMap);
    return (
      <div className="main">
        <div className="head">
          <button onClick={() => { this.shoot(this.state, bullet) }}>
            Shoot!
          </button>
        </div>
        <div className="controls">
          <div>
            <h5>Bullet properties:</h5>
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
        <div className="battlefield">
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
            {
              shots.map((b, idx) => (
                  <Shot
                    key={idx}
                    { ...shotsMap[b] }
                  />
                )
              )
            }
            <Bullet
              { ...bullet }
            />
          </svg>
        </div>
        <div className="controls">
          <div>
            {
              armorMap.map((a, idx) => (
                <div key={idx}>
                  <h5>{armor[a].name}:</h5>
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
      </div>
    );
  }
};

export default Body;
