import React from 'react';
import { Progress } from './progress';
import { Controls } from './controls';
import { TaskList } from './task-list';

const GRANTED = 'granted';

export class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    let permission = false;

    if (window.hasOwnProperty('Notification')) {
      permission = Notification.permissionGranted === GRANTED;
      if (!permission) {
        Notification.requestPermission(permission => {
          this.setState({ notificationPermission: permission === GRANTED });
        });
      }
    }

    this.state = {
      interval: null,
      notificationPermission: false,
      active: 1,
      tasks: [
        {
          id: 1,
          name: 'test',
          time: 20,
          duration: 20 * 60,
          break: 5 * 60,
          amount: 0,
          started: false,
        },
      ],
    };
  }

  handleToggleStartStop() {
    console.log('handle Toggle Start Stop');
    const task = this.getActiveTask();
    if (!task) return;
    if (task.started) {
      this.stop(task);
    } else {
      this.start(task);
    }
  }

  finish(task) {
    if (this.state.notificationPermission) {
      new Notification(task.name + ' ended');
    }
    this.stop(task);
  }

  stop(task) {
    console.log('stop');
    this.updateActiveTask({ ...task, started: false });
    clearInterval(this.state.interval);
  }

  start(task) {
    console.log('start');
    this.updateActiveTask({ ...task, started: true });
    this.setState(prevState => ({
      ...prevState,
      ...{
        interval: setInterval(() => {
          const task = this.getActiveTask();
          if (task.time <= 0) {
            this.finish(task);
          } else {
            task.time -= 1;
            this.updateActiveTask(task);
          }
        }, 1000),
      },
    }));
  }

  getActiveTask() {
    const index = this.state.tasks.findIndex(
      task => task.id === this.state.active,
    );
    if (index >= 0) {
      return this.state.tasks[index];
    }
  }

  handleDecrease() {
    console.log('decrease');
    this.decreaseIncrease(-60);
  }
  handleIncrease() {
    console.log('increase');
    this.decreaseIncrease(60);
  }
  handleReset() {
    console.log('reset');
    this.decreaseIncrease(null, true);
  }

  decreaseIncrease(value, reset = false) {
    const task = { ...this.getActiveTask() };
    if (!task) return;
    if (reset) {
      task.time = task.duration;
      task.started = false;
      clearInterval(this.state.interval);
    } else {
      if (task.duration + value >= 0 && task.time + value >= 0) {
        task.duration += value;
        task.time += value;
      }
    }
    this.updateActiveTask(task);
  }

  updateActiveTask(task) {
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index] = task;

      state.tasks = tasks;
      return state;
    });
  }

  render() {
    const activeTask = this.getActiveTask();

    return (
      <div>
        <Progress
          onToggleStartStop={() => this.handleToggleStartStop()}
          task={activeTask}
        />
        <Controls
          onDecrease={() => this.handleDecrease()}
          onIncrease={() => this.handleIncrease()}
          onReset={() => this.handleReset()}
          task={activeTask}
        />
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}
