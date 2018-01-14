import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      rate: 0,
      term: 15,
      output: null,
    };
    this.onChange = this.onChange.bind(this);
  }
  //  input element onchange event handler to update state
  onChange(event) {
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  // function to calculate monthly payments
  //  parameters use desctructuring
  //  updates state: output if click event handler is triggered
  calculate({ balance, rate, term, period }) {
    if (rate === 0) {
      return;
    }

    const monthlyInterest = (rate * 0.01) / 12;
    const months = term * 12;
    const expression = (1 + monthlyInterest) ** months;
    const result = balance * ((monthlyInterest * expression) / (expression - 1));

    this.setState({
      output: ` $${parseFloat(result.toFixed(2))}`,
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="header">Mortgage Calculator</h1>
        <hr />
        <p className="balance">
        Loan Balance
        </p>
        <input
          name="balance"
          className="tablet"
          type="number"
          value={ this.state.balance }
          onChange={ this.onChange }
        />
        <p className="rate">
        Interest Rate (%)
        </p>
        <input
          name="rate"
          className="tablet"
          type="number"
          step="0.01"
          value={ this.state.rate }
          onChange={ this.onChange }
        />
        <p className="term">
        Loan Term (years)
        </p>
        <select name="term" className="tablet" onChange={ this.onChange }>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button
          name="submit"
          className="tablet"
          onClick={ () => this.calculate(this.state) }
        >
          Calculate
          </button>
        <p className="label">Monthly Payments:</p>
        <p id="output" className="output">{ this.state.output }</p>
      </div>
    );
  }
}
