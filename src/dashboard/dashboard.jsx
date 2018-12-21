import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Row from '../common/layout/row';
import ValueBox from '../common/widget/valueBox';

class Dashboard extends Component{
    render(){
        const { credit, debt } = this.props.summary;
        return (
            <div>
                <ContentHeader title='Dashboard' small='version 1.0'/>
                <Content>
                    <Row>
                        <ValueBox cols='12 6 4' color='green' icon='bank' value={`R$ ${credit}`} text='Total de créditos'/>
                        <ValueBox cols='12 6 4' color='red' icon='credit-card' value={`R$ ${debt}`} text='Total de débitos'/>
                        <ValueBox cols='12 6 4' color='blue' icon='money' value={`R$ ${credit - debt}`} text='Valor consolidado'/>
                    </Row>
                </Content>
            </div>
        );
    };
}

const mapStateToProps = state => ({ summary: state.dashboard.summary});
export default connect(mapStateToProps)(Dashboard);