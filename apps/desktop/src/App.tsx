import { useTimers } from './hooks/useTimers';
import Form from './components/Form';
import TimerList from './components/TimerList';

export default function App() {
  const { timers, addTimer, deleteTimer, startTimer, stopTimer, resetTimer } = useTimers();

  const activeTimers = timers.filter((timer) => timer.isActive);
  const inactiveTimers = timers.filter((timer) => !timer.isActive);

  return (
    <>
      <Form addTimer={addTimer} />
      {activeTimers.length > 0 && (
        <TimerList
          timers={activeTimers}
          onStart={startTimer}
          onStop={stopTimer}
          onReset={resetTimer}
          onDelete={deleteTimer}
        />
      )}
      {inactiveTimers.length > 0 && (
        <TimerList
          timers={inactiveTimers}
          onStart={startTimer}
          onStop={stopTimer}
          onReset={resetTimer}
          onDelete={deleteTimer}
        />
      )}
    </>
  );
}
