import React, { Component } from 'react';
import { isBefore, isWeekend, addDays, format } from 'date-fns';
import humanInterval from 'human-interval';
import getProxyUrl from '../../../utils/get-proxy-url';
import NumberWidget from '../../../components/NumberWidget';

const DEAFULT_TITLE = 'Sprint Days Remaining';

export default class SprintDaysRemaining extends Component {
  state = {
    daysRemaining: null,
    isLoading: false,
    error: false
  };

  getDaysRemaining(days, date, endDate) {
    if (isBefore(date, endDate)) {
      let daysScoped = days;

      if (!isWeekend(date)) {
        daysScoped = ++days;
      }

      return this.getDaysRemaining(daysScoped, addDays(date, 1), endDate);
    } else {
      return days;
    }
  }

  fetchDaysRemaining() {
    this.setState({ isLoading: true });

    const { boardId, url, username, password } = this.props;

    fetch(`${getProxyUrl()}${url}/rest/agile/1.0/board/${boardId}/sprint?state=active`, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        daysRemaining: this.getDaysRemaining(0, new Date(), response.values[0].endDate),
        isLoading: false
      })
    })
    .catch(error => {
      console.error(error);
      this.setState({ error: true, isLoading: false });
    });
  }

  componentDidMount () {
    this.fetchDaysRemaining();
    window.setInterval(this.fetchDaysRemaining.bind(this), humanInterval('one day'));
  }

  render () {
    const { daysRemaining, isLoading, error } = this.state;
    const { title } = this.props;

    return (
      <NumberWidget
        title={title || DEAFULT_TITLE}
        loading={isLoading}
        error={error}
        amount={daysRemaining}
        amountDescription="Days remaining"
      />
    )
  }
}
