import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DataVisualizationWebPartStrings';
import DataVisualization from './components/DataVisualization';
import { IDataVisualizationProps } from './components/IDataVisualizationProps';

export interface IDataVisualizationWebPartProps {
  ListName: string;
}

export default class DataVisualizationWebPart extends BaseClientSideWebPart<IDataVisualizationWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IDataVisualizationProps> = React.createElement(
      DataVisualization,
      {
        ListName:this.properties.ListName,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

 




  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
