import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import VCardWidget from './vCard/vCard-widget';
import SocialWidget from './social-widget/social-widget';
import SocialProfile from './social-widget/social-profile-icon';
import userpic from '../../image/user1.png';
import {  dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { StackedAreaChart } from '../Charts/recharts/charts/';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';

const tableDataList = clone(dataList);
tableDataList.size = 5;

export default class IsoWidgets extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      padding: '15px',
      overflow: 'hidden'
    };

    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];

    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500
    };
    return (
      <div style={wisgetPageStyle}>
        
        <Row style={rowStyle} gutter={0} justify="start">

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={455}>
                <StackedAreaChart {...stackConfig} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart
                  {...googleChartConfigs.BarChart}
                  chartEvents={chartEvents}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470}>
                <GoogleChart {...googleChartConfigs.Histogram} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

        </Row>

        
        <Row style={rowStyle} gutter={0} justify="start">

        <Col md={8} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450}>
                {/* Google Bar Chart */}
                <GoogleChart {...googleChartConfigs.ComboChart} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={8} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              
              <IsoWidgetBox height={450}>
                <GoogleChart {...googleChartConfigs.TrendLines} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        <Col md={8} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* VCard Widget */}
              <VCardWidget
                style={{ height: '450px' }}
                src={userpic}
                alt="Jhon"
                name={<IntlMessages id="widget.vcardwidget.name" />}
                title={<IntlMessages id="widget.vcardwidget.title" />}
                description={
                  <IntlMessages id="widget.vcardwidget.description" />
                }
              >
                <SocialWidget>
                  <SocialProfile
                    url="https://www.facebook.com/triangulopisos/"
                    icon="ion-social-facebook"
                    iconcolor="#3b5998"
                  />
                  <SocialProfile
                    url="https://www.instagram.com/triangulopisos/?hl=pt-br"
                    icon="ion-social-instagram"
                    iconcolor="#dd4b39"
                  />
            
                </SocialWidget>
              </VCardWidget>
            </IsoWidgetsWrapper>
          </Col>
         
        </Row>



      </div>
    );
  }
}
