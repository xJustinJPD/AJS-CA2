import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>

      {/* Home Routes */}
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
        />

      {/* Cars Routes */}
      <Tabs.Screen
        name="(auth)/cars/index"
        options={{
          title: 'Cars',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="car" color={color} />,
        }}
      />

<Tabs.Screen
        name="(auth)/cars/create"
        options={{
          title: 'Create Car',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/cars/[id]/index"
        options={{
          title: 'Single Car',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/cars/[id]/edit"
        options={{
          title: 'Edit Car',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/cars/[id]/delete"
        options={{
          title: 'Delete Car',
          href:null,
        }}
      />

      {/* Mechanics Routes */}
      <Tabs.Screen
        name="(auth)/mechanics/index"
        options={{
          title: 'Mechanics',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />

<Tabs.Screen
        name="(auth)/mechanics/create"
        options={{
          title: 'Mechanics Create',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/mechanics/[id]/index"
        options={{
          title: 'Mechanic Single',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/mechanics/[id]/edit"
        options={{
          title: 'Mechanic Edit',
          href:null,
        }}
      />

<Tabs.Screen
        name="(auth)/mechanics/[id]/delete"
        options={{
          title: 'Mechanic Delete',
          href:null,
        }}
      />



      {/* Drivers Routes */}
      <Tabs.Screen
        name="(auth)/drivers/index"
        options={{
          title: 'Drivers',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

<Tabs.Screen
        name="(auth)/drivers/create"
        options={{
          title: 'Create Driver',
          href:null
        }}
      />

      <Tabs.Screen
        name="(auth)/drivers/[id]/index"
        options={{
          title: 'Single Driver',
          href:null
        }}
      />

      <Tabs.Screen
        name="(auth)/drivers/[id]/delete"
        options={{
          title: 'Delete Driver',
          href:null
        }}
      />

<Tabs.Screen
        name="(auth)/drivers/[id]/edit"
        options={{
          title: 'Edit Driver',
          href:null
        }}
      />
      
    </Tabs>
  );
}
