import { type ActionFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { sendWelcomeMail } from '~/utils/mailer.server';
//
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get('name'));
  const email = formData.get('email');
  sendWelcomeMail(name, email as string);
  return { name, email };
};

export default function Index() {
  const actionData = useActionData();
  return (
    <Form
      method="post"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '95vh',
        maxWidth: '320px',
        margin: '0 auto',
      }}
    >
      <p>
        {actionData?.name && actionData.email && 'Gracias pro suscribeirte'}
      </p>
      <input name="name" placeholder="Escribe tu nombre" />
      <input type="email" name="email" placeholder="Escribe tu correo" />
      <button
        type="submit"
        style={{
          cursor: 'pointer',
          padding: '16px 0',
        }}
      >
        Suscribirme
      </button>
    </Form>
  );
}
