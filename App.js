import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
      <AuthProvider>
        <PlayerContext>
            <Navigation/>
        </PlayerContext>
      </AuthProvider>
  );
}
