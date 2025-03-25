# REACT BIG PRACTICE - HUMAN RESOURCE MANAGEMENT

## OVERVIEW

- This document outlines the Human Resource Management system, detailing its functionality, features, technical stack, and estimated implementation timeline, based on [the provided design](https://www.figma.com/design/Dd7pkxd0HvurA1JwGkaIQZ/HRMS(Human-Resource-management-system---Employee-mnagement-System)?node-id=0-1&p=f&t=TS6laEuOmzVtIdO8-0).
- Plan: [Link](https://docs.google.com/document/d/1hys8JcOsG7pdDh5pyQB0PnajVLfvQbPx_1T9qOfaBCI/edit?usp=sharing)

## TARGETS

- Apply the knowledge learned about React Advanced to best practice
- Build a web application that meets the requirements
- Achieve unit testing goals with coverage greater than 80%
- Check and measure by PageSpeed as well
- Solve all issues from the Axe add-on

## TECHNICAL STACKS

- React 18.0.0
- Zustand 5.0.1
- React Hook Form 7.53.2
- Zod 3.23.8
- shadcn/ui
- Strapi
- TanStack Query

## DEVELOPMENT TOOLS

- Husky
- Prettier
- ESLint
- CommitLint
- TypeScript
- Storybook
- Jest
- React-Testing-Library
- Vercel

## TIMELINE

- Timeline:
  - Estimate: 19 days
  - Calendar:
    - Start: 2025/03/12
    - End: 2025/04/08

## REQUIREMENTS

### UI & UX Design

- Figma: [design](https://www.figma.com/design/Dd7pkxd0HvurA1JwGkaIQZ/HRMS(Human-Resource-management-system---Employee-mnagement-System)?node-id=0-1&p=f&t=TS6laEuOmzVtIdO8-0)

### Project Requirements

#### UNIT TESTING

- Unit test coverage is required over 80%.

#### PAGE SPEED

- Checking the website page speed through the [page speed insight](https://pagespeed.web.dev/).

#### CROSS BROWSERS

- The site should function smoothly across the - specified browser versions without any UI breaks.
- Chrome (126.0+)
- Firefox (128.0+)
- Microsoft Edge on Windows 10 (126.0+)

#### DEPLOYMENT

- [Reference link](https://vercel.com/)

### Features Scope

#### Authentication

- Users can register a new account 
- Admin/Users can sign in with an existing account

#### Dashboard

##### User Dashboard

- Users can see and update their profiles
  - Personal Details
  - Job Details
- Users can see Information in the below sections:
  - Available Leave Days
  - April Pay slip breakdown
  - Birthdays
- Users can click on the “Apply to Leave” button to request leave

###### User Leave Application

- Users can see the Leave Application with the below sections:
  - Total interest day leave
  - Leave history
- Users can click on the “Apply” button to request leave
- Users can filter Leave application by type

###### User Leave Request

- Users can see the leave request form
- Users can fill in all information and submit a leave request form

###### Admin Dashboard

- Admin can see:
  - Category manages
  - Applied jobs
  - Employees
  - Candidates
- Admin can click on the “Leaves” button to manage leave

###### Admin Leave Management

- Admin can see Leave Application with the below sections:
  - List user leave
  - Leave actions
- Admin can search by name user leave
- Admin can filter by name user leave
- Admin can click action Approve/Decline leave request

### Out Of Scope

- All features not related leave management out of scope
- Reset password out of scope

## Getting started

- Step 1: Clone repository.
  - With HTTPS:
    - `$ git clone https://gitlab.asoft-python.com/huy.nguyenduc/react-training.git`.
  - With SSH:
    - `$ git clone git@gitlab.asoft-python.com:huy.nguyenduc/react-training.git`.
- Step 2: Change a branch to feature/advanced-practice
  - `git checkout feature/big-practice`.
- Step 3: Move to the folder advanced-practice.
  - `cd ./xceltech`.
- Step 4: Create file `.env` and provide variables according to `.env.example`.
- Step 5:
  - Open terminal > `pnpm i`.
  - Run `pnpm run dev` to start application.
- Step 6:
  - Run Storybook: `pnpm run storybook`.
  - Run Test: `pnpm run test`

## Author

- Huy Nguyen.
- Email: [huy.nguyenduc@asnet.com.vn](huy.nguyenduc@asnet.com.vn).
