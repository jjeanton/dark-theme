import React, { Component, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { FirebaseContext } from '../../firebase';
import notificationIcon from '../../Icons/notifcation.svg';
import {ReactComponent as Notificationic} from '../../Icons/notifcation.svg';
import NotificationIcon from '../Icons/Custom/NotificationIcon';
import Timer from '../../components/Timer';



const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    dataBox: PropTypes.func,
  };
  
  const defaultProps = {
    dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
  };

const WidgetLine = ({variantw, dataw}) => {
    
    const {firebase} = useContext(FirebaseContext);
    const [notification, saveNotification] = useState();
    const [classnoti, setClassnoti] = useState('');
    const [time, setTime] = useState({ms:0, s:0, m:0, h:0})

    useEffect(() => {
        const getNotification = () => {
        firebase.db.collection('notifications').where('id_line', '==', dataw.id).onSnapshot(handleSnapshot);
        // firebase.db.collection('notifications').onSnapshot(handleSnapshot);
        }
        startTimer();
        getNotification();
    }, []);
    var updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h;

    const startTimer = () => {
      timerRun();
      setInterval(timerRun, 10);
    }

    const timerRun = () => {
      if(updateM === 60) {
        updateH++;
        updateM = 0;
      }
      if(updateS === 60) {
        updateM++;
        updateS = 0;
      }
      if(updateMs === 100) {
        updateS++;
        updateMs = 0;
      }
      updateMs++;
      return setTime({ms:updateMs, s: updateS, m:updateM, h:updateH})
    }
    function handleSnapshot(snapshot) {
        const getNotification = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
        });
        
        if(getNotification.length > 0) {
          saveNotification(getNotification[0]);
          setClassnoti(getClassNoti(getNotification[0]));
        }
    }
     // eslint-disable-next-line
    //  const { children, className, cssModule, dataBox, ...attributes } = this.props;

    const getClassNoti = (notification) => {
      switch (notification.type) {
        case 'production':
          return ('#6f42c1');
      
        case 'maintenance':
          return ('#17a2b8');
        
        case 'logistic':
          return ('#ffc107');
      
        case 'quality':
          return ('#e83e8c');
      
        default:
          break;
      }
    }
     // demo purposes only
     const data = dataw;
     const variant = variantw;
     const name = data.name;
 
     if (!variant || ['success', 'danger', 'warning', 'info'].indexOf(variant) < 0) {
       return (null);
     }
 
     const back = 'bg-' + variant;
    //  const icon = 'fa fa-' + variant;
     const keys = Object.keys(data);
     const vals = Object.values(data);
 
     const classCard = 'brand-card';
     const classCardHeader = classNames(`${classCard}-header`, back);
     const classCardBody = classNames(`${classCard}-body`);
     const classIconNoti = classNames(`cui-settings icons font-lg d-block mt-1`, `badge badge-pill`)
    //  const classes = mapToCssModules(classNames(classCard, className), cssModule);
    return ( 
        <div className="brand-card">
        <div className={classCardHeader}>
          {notification ?( <div style={{position: 'absolute', right:'10px', top:'5px',}}>
            <NotificationIcon className={classIconNoti} fill={classnoti} />
          </div> ) : null}
          <div className="text-value ml-2">{name}</div>
          {notification ? (
            <div style={{display:'block', position:'absolute', top:'60%'}}>
              <Timer time={time}/>
            </div>
          ) : null}
          {/* {children} */}
        </div>
        <div className={classCardBody}>
          <div>
            <div className="text-value">{dataw.efficiency}%</div>
            <div className="text-uppercase text-muted small">eficiencia</div>
          </div>
          <div>
            <div className="text-value">{dataw.oee}%</div>
            <div className="text-uppercase text-muted small">OEE</div>
          </div>
        </div>
      </div>
     );

}
// WidgetLine.propTypes = propTypes;
// WidgetLine.defaultProps = defaultProps;
 
export default WidgetLine;