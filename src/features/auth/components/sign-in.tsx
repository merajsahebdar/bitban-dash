import Link from 'next/link';
import { FC, useState } from 'react';

import { Button, Card, CardContent, CardFooter, CardHeader } from '../../../libs/uikit';
import { Grid } from '../../../libs/uikit/components/grid';
import { Input } from '../../../libs/uikit/components/input';

/**
 * Auth - Sign In
 */
export const SignIn: FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card>
      <CardHeader title="Sign In" />
      <CardContent>
        <Input
          label="Email Address"
          onChange={e => {
            setIdentifier(e.target.value);
          }}
          value={identifier}
        />
        <Input
          label="Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          type="password"
          value={password}
        />
      </CardContent>
      <CardFooter>
        <Grid container>
          <Grid item>
            <Link href="/-/create-account">Create an Account</Link>
          </Grid>
          <Grid item push>
            <Button>Sign In</Button>
          </Grid>
        </Grid>
      </CardFooter>
    </Card>
  );
};
