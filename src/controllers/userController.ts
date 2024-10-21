import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user';
import { validateUUID } from '../utils/validateUUID';

let users: User[] = [];

// Get all users
export const getUsers = (req: Request, res: Response): void => {
  res.status(200).json(users);
};

// Get user by ID
export const getUserById = (req: Request, res: Response): void => {
  const { userId } = req.params;

  if (!validateUUID(userId)) {
    return res.status(400).json({ message: 'Invalid UUID' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Create a new user
export const createUser = (req: Request, res: Response): void => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// Update existing user
export const updateUser = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!validateUUID(userId)) {
    return res.status(400).json({ message: 'Invalid UUID' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = { ...users[userIndex], username, age, hobbies };
  users[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
};

// Delete user
export const deleteUser = (req: Request, res: Response): void => {
  const { userId } = req.params;

  if (!validateUUID(userId)) {
    return res.status(400).json({ message: 'Invalid UUID' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
};
