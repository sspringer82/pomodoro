import React from 'react';
import { Progress } from './progress';
import { Controls } from './controls';
import { TaskList } from './task-list';
import { Footer } from './footer';
import {
  GRANTED,
  STATE_STARTED,
  STATE_STOPPED,
  STATE_PAUSE_STARTED,
  STATE_PAUSE_STOPPED,
  STATE_BIG_BREAK_STOPPED,
  STATE_BIG_BREAK_STARTED,
  MODE_SINGLE,
  MODE_REPEAT_ONE,
  MODE_REPEAT_ALL,
} from '../util/constants';

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

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const repeatMode = parseInt(localStorage.getItem('repeatMode'), 10) || 0;
    const { duration = 15, count = 5 } =
      JSON.parse(localStorage.getItem('break')) || {};
    this.state = {
      interval: null,
      notificationPermission: false,
      tasks,
      repeatMode,
      break: {
        active: false,
        duration: parseInt(duration, 10),
        count: parseInt(count, 10),
        time: 0,
        state: STATE_BIG_BREAK_STOPPED,
      },
    };
  }

  handleToggleStartStop() {
    console.log('handle Toggle Start Stop');
    const task = this.getActiveTask();
    if (!task) return;
    if (task.state === STATE_STARTED || task.state === STATE_PAUSE_STARTED) {
      this.stop(task);
    } else {
      this.start(task);
    }
  }

  doBigBreak() {
    const taskCount = this.state.tasks.reduce(
      (prev, currentTask) => prev + currentTask.amount,
      0,
    );
    return taskCount % this.state.count === 0;
  }

  finish(task) {
    if (this.state.notificationPermission) {
      new Notification(task.name + ' ended');
    }

    if (this.state.break.active) {
      clearInterval(this.state.interval);
      this.setState({ break: { ...this.state.break, active: false } });
      task = this.getActiveTask();
    }

    if (task.state === STATE_STARTED) {
      task.amount += 1;
      if (this.doBigBreak()) {
        this.startBigBreak();
      } else {
        this.startPause(task);
      }
    } else {
      switch (this.state.repeatMode) {
        case MODE_SINGLE:
          this.stop(task);
          this.reset();
          break;
        case MODE_REPEAT_ONE:
          this.stop(task);
          task.time = task.duration;
          this.start(task);
          break;
        case MODE_REPEAT_ALL:
        default:
          this.stop(task);
          let index = this.tasks.findIndex(t => t.id === task.id);
          let nextIndex = ++index >= this.tasks.length ? 0 : index;
          this.start(this.tasks[nextIndex]);
          break;
      }
    }
  }

  startPause(task) {
    const t = { ...task, time: task.break };
    clearInterval(this.state.interval);
    this.start(t, STATE_PAUSE_STARTED);
  }

  startBigBreak() {
    const bigBreak = this.state.break;
    bigBreak.active = true;
    clearInterval(this.state.interval);
    this.start(this.state.break, STATE_BIG_BREAK_STARTED);
  }

  stop(task) {
    let state = STATE_STOPPED;
    if (task.state === STATE_PAUSE_STARTED) {
      state = STATE_PAUSE_STOPPED;
    }
    this.updateTask({ ...task, state });
    clearInterval(this.state.interval);
  }

  start(task, state = STATE_STARTED) {
    if (state !== STATE_BIG_BREAK_STARTED) {
      this.updateTask({ ...task, state });
    } else {
      this.setState({ break: { ...this.state.break, active: true } });
    }
    this.setState(prevState => ({
      ...prevState,
      ...{
        interval: setInterval(() => {
          const task = this.getActiveTask();
          if (task.time <= 0) {
            this.finish(task);
          } else {
            if (state !== STATE_BIG_BREAK_STARTED) {
              task.time -= 1;
              this.updateTask(task);
            } else {
              this.setState({
                break: { ...this.state.break, time: this.state.break.time - 1 },
              });
            }
          }
        }, 1000),
      },
    }));
  }

  getActiveTask() {
    if (this.state.break.active) {
      return this.state.break;
    }
    return this.state.tasks.find(task => task.active);
  }

  handleDecrease() {
    console.log('decrease');
    this.decreaseIncrease(-60);
  }
  handleIncrease() {
    console.log('increase');
    this.decreaseIncrease(60);
  }
  reset() {
    this.decreaseIncrease(null, true);
  }
  handleDelete(task) {
    const index = this.state.tasks.findIndex(t => t.id === task.id);
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState(prev => ({ ...prev, ...{ tasks } }));
    this.storeTasks(tasks);
    if (task.active) {
      this.handleActivate(tasks[0]);
    }
  }

  handleActivate(task) {
    if (!task) {
      return;
    }
    this.setState(prevState => {
      const tasks = prevState.tasks.map(t => {
        const clone = { ...t };
        clone.active = t.id === task.id ? true : false;
        clone.time = clone.active ? clone.duration : 0;
        return clone;
      });
      this.storeTasks(tasks);
      return {
        tasks,
      };
    });
  }

  storeTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleCreate(data) {
    if (data.title === '') {
      return;
    }
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const nextId =
        tasks.reduce(
          (prev, current) => (prev > current.id ? prev : current.id),
          0,
        ) + 1;

      tasks.push({
        id: nextId,
        name: data.title,
        time: parseInt(data.time * 60, 10),
        duration: parseInt(data.time * 60, 10),
        break: parseInt(data.break * 60, 10),
        amount: 0,
        state: STATE_STOPPED,
        active: false,
      });

      this.storeTasks(tasks);
      state.tasks = tasks;
      return state;
    });
  }

  decreaseIncrease(value, reset = false) {
    const task = { ...this.getActiveTask() };
    if (!task) return;
    if (reset) {
      task.time = task.duration;
      task.state = STATE_STOPPED;
      clearInterval(this.state.interval);
    } else {
      if (task.duration + value >= 0 && task.time + value >= 0) {
        task.duration += value;
        task.time += value;
      }
    }
    this.updateTask(task);
  }

  updateTask(task) {
    this.setState(prevState => {
      const state = { ...prevState };
      const tasks = [...this.state.tasks];

      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index] = task;

      state.tasks = tasks;

      localStorage.setItem('tasks', JSON.stringify(tasks));
      return state;
    });
  }

  saveSettings({ duration, count }) {
    const breakSettings = {
      duration: parseInt(duration, 10),
      count: parseInt(count, 10),
    };

    localStorage.setItem('break', JSON.stringify(breakSettings));
    this.setState({ break: breakSettings });
  }

  toggleRepeatMode() {
    const repeatMode =
      this.state.repeatMode < 2 ? this.state.repeatMode + 1 : 0;

    localStorage.setItem('repeatMode', repeatMode);
    this.setState(prevState => ({ ...prevState, ...{ repeatMode } }));
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
          onReset={() => this.reset()}
          task={activeTask}
        />
        <TaskList
          tasks={this.state.tasks}
          onDelete={task => this.handleDelete(task)}
          onActivate={task => this.handleActivate(task)}
        />
        <Footer
          onCreate={data => this.handleCreate(data)}
          saveSettings={settings => this.saveSettings(settings)}
          duration={this.state.break.duration}
          count={this.state.break.count}
          repeatMode={this.state.repeatMode}
          toggleRepeatMode={() => this.toggleRepeatMode()}
        />
      </div>
    );
  }
}
