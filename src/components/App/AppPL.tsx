import * as React from "react";
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import {
    IconType,
    MenuItem,
    MenuSideTop,
    Panel,
    PanelHeader,
    RootComponent,
    Section,
    Sidebar,
    Workspace
} from "ufs-ui";

import DataTable from "../DataTable/DataTable";
import DataForm from "../DataForm/DataForm";
import DataTableOrder from "../DataTableOrders/DataTableOrder";
import TShirtForm from "../TShirtForm/TShirtForm";
import OrderForm from "../OrderForm/OrderForm";

export default function AppPL() {
    return (
        <RootComponent>

            <Sidebar>
                <MenuSideTop>
                    <MenuItem className="sber_logo"/>
                    <Link to="/" replace>
                        <MenuItem text="Таблица данных" title="Таблица данных" icon={IconType.MENU_CATALOG}/>
                    </Link>
                    <Link to="/form" replace>
                        <MenuItem text="Форма добавления записи" title="Форма добавления записи"
                                  icon={IconType.MENU_FEEDBACK}/>
                    </Link>
                    <Link to="/dataOrders" replace>
                        <MenuItem text="Таблица заказов" title="Таблица заказов" icon={IconType.MENU_SALES} />
                    </Link>
                    <Link to="/addTShirt" replace>
                        <MenuItem text="Форма добавления футболки" title="Форма добавления футболки"
                                  icon={IconType.MENU_FEEDBACK}/>
                    </Link>
                    <Link to="/addOrder" replace>
                        <MenuItem text="Форма добавления заказа" title="Форма добавления заказа"
                                  icon={IconType.MENU_FEEDBACK} />
                    </Link>
                </MenuSideTop>
            </Sidebar>

            <Section>
                <Workspace>
                    <Panel>

                        <PanelHeader>
                            Демоприложениe
                        </PanelHeader>

                        <Switch>
                            <Route path="/" component={DataTable} exact/>
                            <Route path="/form" component={DataForm}/>
                            <Route path="/dataOrders" component={DataTableOrder}/>
                            <Route path="/addTShirt" component={TShirtForm}/>
                            <Route path="/addOrder" component={OrderForm} />
                        </Switch>

                    </Panel>
                </Workspace>
            </Section>

        </RootComponent>
    )
}