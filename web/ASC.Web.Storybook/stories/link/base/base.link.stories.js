import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from 'asc-web-components';
import Readme from './README.md';
import { text, boolean, withKnobs, select, number, color } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import { action } from '@storybook/addon-actions';

const type = ['action', 'page'];
const target = ['_blank', '_self', '_parent', '_top'];

function clickActionLink(e) {
  action('actionClick')(e);
}

storiesOf('Components|Link', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('base', () => {

    const href = text('href', "http://onlyoffice.com");

    const actionProps = (href && href.length > 0) ? { href } : { onClick: clickActionLink };

    const label = text('text', 'Simple link');

    const isTextOverflow=boolean('isTextOverflow', false);

   return (
   <Section>
        <Link
          type={select('type', type, 'page')}
          color={color('color', '#333333')}
          fontSize={number('fontSize', 13)}
          isBold={boolean('isBold', false)}
          title={text('title', undefined)}
          target={select('target', target, '_blank')}
          isTextOverflow={isTextOverflow}
          isHovered={boolean('isHovered', false)}
          isSemitransparent={boolean('isSemitransparent', false)}
          {...actionProps}
        >
          {label}
        </Link>
    </Section>
   )}
  );
