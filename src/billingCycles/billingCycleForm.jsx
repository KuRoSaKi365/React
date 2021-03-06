import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import inputAndLabel from '../common/form/labelAndInput';
import { init } from './billingCycleActions';
import ItemList from './itemList';
import Summay from './summary';
class BillingCycleForm extends Component {

    calculateSummary(){
        const sum = (t, v) => t + v;
        return {
            sumOfCredits : this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts : this.props.debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props;
        const { sumOfCredits, sumOfDebts } = this.calculateSummary();

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={inputAndLabel} cols='12 4' placeholder='informe o nome' label='Nome:' readOnly={readOnly} />
                    <Field name='month' component={inputAndLabel} cols='12 4' placeholder='Informe o mês' label='Mês:' type='number' readOnly={readOnly} />
                    <Field name='year' component={inputAndLabel} cols='12 4' placeholder='Informe o ano' label='Ano:' type='number' readOnly={readOnly} />

                    <Summay credits={sumOfCredits} debts={sumOfDebts}/>

                    <ItemList cols='12 6' list={credits} readOnly={readOnly} legend='Créditos' field='credits' />
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} legend='Débitos' field='debts' showStatus={true}/>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        );
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm);
const selector = formValueSelector('billingCycleForm');
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);