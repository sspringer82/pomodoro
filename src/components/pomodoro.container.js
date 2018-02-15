import React from 'react';
import { Progress } from './progress';
import { Controls } from './controls';
import { TaskList } from './task-list';

export class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      active: 1,
      tasks: [
        {
          id: 1,
          name: 'test',
          time: 20 * 60,
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
      console.log('stop');
      this.updateActiveTask({ ...task, started: false });
      clearInterval(this.state.interval);
    } else {
      console.log('start');
      this.updateActiveTask({ ...task, started: true });
      this.setState(prevState => ({
        ...prevState,
        ...{
          interval: setInterval(() => {
            const task = this.getActiveTask();
            task.time -= 1;
            this.updateActiveTask(task);
          }, 1000),
        },
      }));
    }
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
      task.duration += value;
      task.time += value;
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
